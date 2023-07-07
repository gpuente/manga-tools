// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  Job,
  Metadata,
  JobStatus,
  RoutineStepStatus,
  Worker,
} from '../main/utils/JobManager/Job';

describe('Job Class', () => {
  let job: Job;

  const jobID = 'my-id';
  const jobName = 'test job';
  const jobDescriptio = 'test job description';

  beforeEach(() => {
    job = new Job({
      id: jobID,
      name: jobName,
      description: jobDescriptio,
    });
  });

  describe('Set Routine', () => {
    it('should throw an error when you try to set an empty routine', () => {
      const setRoutine = () => job.setRoutine([]);
      expect(setRoutine).toThrow('No steps defined for this routine');
    });

    it('should throw an error when you try to set an undefined routine', () => {
      const setRoutine = () => job.setRoutine();
      expect(setRoutine).toThrow('Routine not defined');
    });

    it('should throw an error when you try to set a non valid routine', () => {
      const setRoutine = () => job.setRoutine(123);
      expect(setRoutine).toThrow('Not valid routine');
    });

    it('should return an error when a step has missing properties', () => {
      const setRoutineMissingID = () =>
        job.setRoutine([
          {
            level: 1,
            status: RoutineStepStatus.IDLE,
            worker: () => {},
          },
        ]);

      const setRoutineMissingLevel = () =>
        job.setRoutine([
          {
            id: 1,
            status: RoutineStepStatus.IDLE,
            worker: () => {},
          },
        ]);

      const setRoutineMissingStatus = () =>
        job.setRoutine([
          {
            id: 1,
            level: 1,
            worker: () => {},
          },
        ]);

      const setRoutineMissingWorker = () =>
        job.setRoutine([
          {
            id: 1,
            level: 1,
            status: RoutineStepStatus.IDLE,
          },
        ]);

      expect(setRoutineMissingID).toThrow('ID not defined at step index: 0');
      expect(setRoutineMissingLevel).toThrow(
        'Level not defined at step index: 0'
      );
      expect(setRoutineMissingStatus).toThrow(
        'Status not defined at step index: 0'
      );
      expect(setRoutineMissingWorker).toThrow(
        'Worker not defined at step index: 0'
      );
    });
  });

  describe('Run Routine', () => {
    it('should run the routine', () => {
      const worker1: Worker<number, number> = (payload, next) => {
        next(payload + 1);
      };

      const worker2: Worker<number, string> = (payload, next) => {
        next((payload + 1).toString());
      };

      const worker3: Worker<string, string> = (payload, next) => {
        next(`The result is: ${payload}`);
      };

      job.setRoutine([
        {
          name: 'step 1',
          description: 'step 1 description',
          id: 1,
          level: 1,
          status: RoutineStepStatus.IDLE,
          worker: worker1,
        },
        {
          name: 'step 2',
          description: 'step 2 description',
          id: 2,
          level: 2,
          status: RoutineStepStatus.IDLE,
          worker: worker2,
        },
        {
          name: 'step 3',
          description: 'step 3 description',
          id: 3,
          level: 3,
          status: RoutineStepStatus.IDLE,
          worker: worker3,
        },
      ]);

      const callback = jest.fn();

      job.onFinish = callback;

      job.start(1);

      expect(callback).toHaveBeenCalledWith(null, 'The result is: 3');
    });
  });

  it('should return job default metadata', () => {
    const expectedObject: Metadata = {
      id: jobID,
      progress: 0,
      name: jobName,
      stepsCompleted: 0,
      status: JobStatus.IDLE,
      description: jobDescriptio,
    };

    expect(job.metadata).toMatchObject(expectedObject);
  });
});
