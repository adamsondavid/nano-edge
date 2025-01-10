import {Deployment} from "./deployment.ts";
import {download} from "./download.ts";
import {Lock} from "async-await-mutex-lock";
import {LRUCache} from "lru-cache"


export class DeploymentManager {
  private readonly lock = new Lock<string>();
  private readonly deployments = new LRUCache<string, Deployment>({
    max: 1024,
    dispose() {
      // TODO should we delete the deployment from the file system for cleanup?
    }
  });

  async get(deploymentName: string) {
    if (this.deployments.has(deploymentName)) return this.deployments.get(deploymentName)!;
    await this.lock.acquire(deploymentName);
    try {
      if (this.deployments.has(deploymentName)) return this.deployments.get(deploymentName)!;
      const deployment = await download(deploymentName);
      this.deployments.set(deploymentName, deployment);
      return deployment;
    } finally {
      this.lock.release(deploymentName);
    }
  }

  delete(deploymentName: string) {
   this.deployments.delete(deploymentName);
  }
}
