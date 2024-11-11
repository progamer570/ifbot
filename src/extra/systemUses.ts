import * as os from "os";

export function getSystemUsage(): string {
  const cpus = os.cpus();
  const cpuCount = cpus.length;
  let totalIdle = 0;
  let totalTick = 0;

  cpus.forEach((cpu) => {
    const { user, nice, sys, irq, idle } = cpu.times;
    const totalCpuTime = user + nice + sys + irq + idle;
    totalTick += totalCpuTime;
    totalIdle += idle;
  });

  const idle = totalIdle / cpuCount;
  const total = totalTick / cpuCount;
  const usage = ((total - idle) / total) * 100;

  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memUsage = (usedMem / totalMem) * 100;

  const result = `
    CPU Usage: ${usage.toFixed(2)}%
    RAM Usage: ${memUsage.toFixed(2)}%
    Total RAM: ${(totalMem / 1024 ** 3).toFixed(2)} GB
    Used RAM: ${(usedMem / 1024 ** 3).toFixed(2)} GB
    Free RAM: ${(freeMem / 1024 ** 3).toFixed(2)} GB
  `;

  return result;
}
export function getSystemUsageDetails() {
  const memoryUsage = process.memoryUsage();
  const rss = (memoryUsage.rss / 1024 ** 2).toFixed(2);
  const heapTotal = (memoryUsage.heapTotal / 1024 ** 2).toFixed(2);
  const heapUsed = (memoryUsage.heapUsed / 1024 ** 2).toFixed(2);
  const external = (memoryUsage.external / 1024 ** 2).toFixed(2);

  const cpuUsage = process.cpuUsage();
  const userCPUTime = (cpuUsage.user / 1000).toFixed(2);
  const systemCPUTime = (cpuUsage.system / 1000).toFixed(2);

  const usageDetails = `
    Memory Usage:
    - RSS: ${rss} MB
    - Heap Total: ${heapTotal} MB
    - Heap Used: ${heapUsed} MB
    - External: ${external} MB

    CPU Usage:
    - User CPU Time: ${userCPUTime} ms
    - System CPU Time: ${systemCPUTime} ms
  `;

  return usageDetails;
}
