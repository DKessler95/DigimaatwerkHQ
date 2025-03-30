import { spawn } from 'child_process';
import path from 'path';
import { log } from './vite';
import * as fs from 'fs';

// This is a simple script to start the Netlify CMS proxy server
export function startCMSProxy() {
  // Ensure content directories exist
  const contentDirs = [
    'public/content',
    'public/content/services',
    'public/content/case-studies',
    'public/content/blog',
    'public/uploads'
  ];
  
  // Create directories synchronously if they don't exist
  contentDirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    try {
      fs.mkdirSync(fullPath, { recursive: true });
    } catch (error: any) { // Type assertion for error
      // Ignore if directory already exists
      if (error.code !== 'EEXIST') {
        console.error(`Error creating directory ${fullPath}:`, error);
      }
    }
  });
  
  // Define content paths
  const rootPaths = {
    services: path.join(process.cwd(), 'public/content/services'),
    'case-studies': path.join(process.cwd(), 'public/content/case-studies'),
    blog: path.join(process.cwd(), 'public/content/blog')
  };
  
  // Convert rootPaths to command line arguments
  const rootPathsArgs = Object.entries(rootPaths).map(([key, value]) => 
    `--${key}=${value}`
  );
  
  // Paths for CMS
  const publicPath = path.join(process.cwd(), 'public');
  const distPath = path.join(process.cwd(), 'public/admin');
  
  // Launch the CMS proxy server as a separate process
  const proxyProcess = spawn('npx', [
    'netlify-cms-proxy-server',
    ...rootPathsArgs,
    `--public=${publicPath}`,
    `--dist=${distPath}`
  ]);
  
  // Log process output
  proxyProcess.stdout.on('data', (data) => {
    log(`[CMS Proxy] ${data}`, 'cms');
  });
  
  proxyProcess.stderr.on('data', (data) => {
    log(`[CMS Proxy Error] ${data}`, 'cms-error');
  });
  
  // Handle process exit
  proxyProcess.on('close', (code) => {
    if (code !== 0) {
      log(`CMS Proxy server exited with code ${code}`, 'cms-error');
    }
  });
  
  // Return the process for cleanup
  return proxyProcess;
}