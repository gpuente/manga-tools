import { Job } from './Job';

class JobManager {
  private jobs: Job[] = [];

  public addJob(job: Job) {
    this.jobs.push(job);
  }

  public async runJobs() {
    for (const job of this.jobs) {
      await job.run();
    }
  }
}
