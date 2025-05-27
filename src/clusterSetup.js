const cluster = require("cluster");
const os = require("os");

const setupCluster = (startServer) => {
  if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork(); // Create a worker process
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });
  } else {
    startServer(); // Call the function to start Express
  }
};

module.exports = setupCluster;
