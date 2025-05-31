// Here you probably want to add abstractions of libraries or utilities

// for example if you were using Sanity as your CMS you might want to add:
// sanity.ts -> methods to interact with Sanity CMS
import { logError, logInfo } from './logger';
// import { prisma } from './prisma';
import { displayNumbers, prompt } from './utils';

export { displayNumbers, logError, logInfo, prompt };

