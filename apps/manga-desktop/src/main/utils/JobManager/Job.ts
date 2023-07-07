/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-underscore-dangle */
export enum JobStatus {
  Running = 'running',
  Stopped = 'stopped',
  Paused = 'paused',
  Failed = 'failed',
  Finished = 'finished',
  IDLE = 'idle',
}

// export enum ImageDownloadStatus {
//   Downloaded = 'downloaded',
//   Failed = 'failed',
//   IDLE = 'idle',
// }

// export class DownloadImageJob {
//   private _status: JobStatus = JobStatus.IDLE;
//   private _progress = 0;
//   private _name: string;
//   private _description: string;
//   private _id: string;

//   constructor(name: string, description: string, id: string) {
//     this._name = name;
//     this._id = id;
//     this._description = description;
//   }

//   public get status(): JobStatus {
//     return this._status;
//   }

//   public get name(): string {
//     return this._name;
//   }

//   public get description(): string {
//     return this._description;
//   }

//   public get progress(): number {
//     return this._progress;
//   }

//   public get id(): string {
//     return this._id;
//   }

//   // run method
//   // stop method
//   // pause method
//   // resume method
//   // get status
//   // get name
//   // get description
//   // get progress
//   // get id
//   // update progress
//   // onJobFinished
//   // onJobFailed
//   // onJobStopped
//   // onJobPaused
//   // onJobResumed
//   // onJobStarted
//   // onJobUpdated
//   // onJobUpdatedProgress
//   // onJobUpdatedStatus
// }

export type NextCallback<T = undefined> = (payload: T) => void;
export type RejectCallback = (error?: Error) => void;

export type OnFinishCallback<T = any> = (
  error: Error | null,
  result: T
) => void;

export enum RoutineStepStatus {
  Running = 'running',
  Failed = 'failed',
  Finished = 'finished',
  IDLE = 'idle',
}

export type Worker<Input = undefined, Output = undefined> = (
  payload: Input,
  next: NextCallback<Output>,
  reject: RejectCallback
) => void;

export interface RoutineStep<Input, Output> {
  id: string | number;
  name?: string;
  description?: string;
  level: number;
  status: RoutineStepStatus;
  worker: Worker<Input, Output>;
}

export type Routine = Array<RoutineStep<any, any>>;
export type Metadata = {
  name: string;
  description: string;
  id: string;
  status: JobStatus;
  progress: number;
  stepsCompleted: number;
};

export type StepIndex = number;

export type ProgressState = {
  progress: number;
  completed: number;
  total: number;
  status: {
    next: StepIndex | undefined;
    prev: StepIndex | undefined;
    current: StepIndex | undefined;
  };
};

export class Job {
  private _status: JobStatus = JobStatus.IDLE;
  private _progress = 0;
  private _steps = 0;
  private _stepsCompleted = 0;
  private _id: string;
  private _name: string;
  private _description: string;
  private _routine: Routine = [];
  private _onFinish: OnFinishCallback = () => {};
  private _progressState: ProgressState = {
    progress: 0,
    completed: 0,
    total: 0,
    status: {
      next: undefined,
      prev: undefined,
      current: undefined,
    },
  };

  constructor(props: {
    id: string;
    name: string;
    description: string;
    routine?: Routine;
  }) {
    this._id = props.id;
    this._name = props.name;
    this._description = props.description;

    if (props.routine) {
      this.setRoutine(props.routine);
    }

    this.next = this.next.bind(this);
  }

  private validateRoutine(jobRoutine: Routine): void {
    if (!jobRoutine) {
      throw new Error('Routine not defined');
    }

    if (!Array.isArray(jobRoutine)) {
      throw new Error('Not valid routine');
    }

    if (jobRoutine.length === 0) {
      throw new Error('No steps defined for this routine');
    }

    jobRoutine.forEach((step, index) => {
      if (!step.level) {
        throw new Error(`Level not defined at step index: ${index}`);
      }

      if (!step.id) {
        throw new Error(`ID not defined at step index: ${index}`);
      }

      if (!step.status) {
        throw new Error(`Status not defined at step index: ${index}`);
      }

      if (!step.worker) {
        throw new Error(`Worker not defined at step index: ${index}`);
      }
    });
  }

  public setRoutine(jobRoutine: Routine) {
    this.validateRoutine(jobRoutine);

    this._routine = jobRoutine;
    this._steps = jobRoutine.length;
    this._stepsCompleted = 0;

    this._routine = jobRoutine.sort();

    const stepsLength = this._routine.length;
    const initialIndex = 0;
    const nextIndex = stepsLength > 1 ? initialIndex + 1 : undefined;

    this._progressState = {
      progress: 0,
      completed: 0,
      total: stepsLength,
      status: {
        prev: undefined,
        next: nextIndex,
        current: initialIndex,
      },
    };
  }

  public set onFinish(callback: OnFinishCallback) {
    this._onFinish = callback;
  }

  public get progressState(): ProgressState {
    return this._progressState;
  }

  public get metadata(): Metadata {
    return {
      id: this._id,
      name: this._name,
      status: this._status,
      progress: this._progress,
      description: this._description,
      stepsCompleted: this._stepsCompleted,
    };
  }

  public run() {
    this._status = JobStatus.Running;
    this._stepsCompleted = 0;
    this._progress = 0;
  }

  public start<T>(payload: T) {
    this._status = JobStatus.Running;
    this._stepsCompleted = 0;
    this._progress = 0;

    const firstStep = this._routine[this._stepsCompleted];
    this.runStep(firstStep, payload);
  }

  /**
   * Updates the progressState to the next step index. Updates the completed progress and the total of completed steps
   * @private
   * @memberof Job
   */
  private moveCursorForward(): void {
    const progressState = this._progressState;

    progressState.completed += 1;
    progressState.progress =
      (progressState.completed / progressState.total) * 100;

    progressState.status.prev = progressState.status.current;
    progressState.status.current = progressState.status.next;
    progressState.status.next =
      progressState.status.current &&
      progressState.status.current < progressState.total
        ? progressState.status.current + 1
        : undefined;
  }

  private next(payload: any) {
    // TODO: update to use progressState instead
    this._stepsCompleted += 1;
    this._progress = (this._stepsCompleted / this._steps) * 100;

    if (this._stepsCompleted >= this._routine.length) {
      this._status = JobStatus.Finished;
      this._onFinish(null, payload);
      return;
    }

    const nextStep = this._routine[this._stepsCompleted];
    this.runStep(nextStep, payload);

    // TODO: call moveCursorForward before onStepCompleted
    // TODO: call onStepCompleted callback
  }

  private reject(error?: Error | unknown) {
    this._status = JobStatus.Failed;
    console.log(error);
  }

  private runStep(step: RoutineStep<any, any>, payload: any) {
    try {
      step.worker(payload, this.next, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
}
