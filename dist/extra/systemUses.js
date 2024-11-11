import * as os from "os";
export function getSystemUsage() {
    var cpus = os.cpus();
    var cpuCount = cpus.length;
    var totalIdle = 0;
    var totalTick = 0;
    cpus.forEach(function (cpu) {
        var _a = cpu.times, user = _a.user, nice = _a.nice, sys = _a.sys, irq = _a.irq, idle = _a.idle;
        var totalCpuTime = user + nice + sys + irq + idle;
        totalTick += totalCpuTime;
        totalIdle += idle;
    });
    var idle = totalIdle / cpuCount;
    var total = totalTick / cpuCount;
    var usage = ((total - idle) / total) * 100;
    var totalMem = os.totalmem();
    var freeMem = os.freemem();
    var usedMem = totalMem - freeMem;
    var memUsage = (usedMem / totalMem) * 100;
    var result = "\n    CPU Usage: ".concat(usage.toFixed(2), "%\n    RAM Usage: ").concat(memUsage.toFixed(2), "%\n    Total RAM: ").concat((totalMem / Math.pow(1024, 3)).toFixed(2), " GB\n    Used RAM: ").concat((usedMem / Math.pow(1024, 3)).toFixed(2), " GB\n    Free RAM: ").concat((freeMem / Math.pow(1024, 3)).toFixed(2), " GB\n  ");
    return result;
}
export function getSystemUsageDetails() {
    var memoryUsage = process.memoryUsage();
    var rss = (memoryUsage.rss / Math.pow(1024, 2)).toFixed(2);
    var heapTotal = (memoryUsage.heapTotal / Math.pow(1024, 2)).toFixed(2);
    var heapUsed = (memoryUsage.heapUsed / Math.pow(1024, 2)).toFixed(2);
    var external = (memoryUsage.external / Math.pow(1024, 2)).toFixed(2);
    var cpuUsage = process.cpuUsage();
    var userCPUTime = (cpuUsage.user / 1000).toFixed(2);
    var systemCPUTime = (cpuUsage.system / 1000).toFixed(2);
    var usageDetails = "\n    Memory Usage:\n    - RSS: ".concat(rss, " MB\n    - Heap Total: ").concat(heapTotal, " MB\n    - Heap Used: ").concat(heapUsed, " MB\n    - External: ").concat(external, " MB\n\n    CPU Usage:\n    - User CPU Time: ").concat(userCPUTime, " ms\n    - System CPU Time: ").concat(systemCPUTime, " ms\n  ");
    return usageDetails;
}
