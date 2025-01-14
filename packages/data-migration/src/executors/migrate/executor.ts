import { MigrateExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { CLILogger } from '../../migrator/logger';
import path from 'path';

export default async function runExecutor(
  options: MigrateExecutorSchema,
  context: ExecutorContext
) {
  process.env.ENV = options.env;
  if (options.migrationTableName) {
    process.env.MIGRATION_TABLE_NAME = options.migrationTableName;
  }

  const migrationsPath = path.join(
    context.cwd,
    options.cwd,
    options.migrationsDir
  );

  const logger = new CLILogger(options.logLevel);

  try {
    const { MigratorRunner } = await import('../../migrator/runner');
    const runner = new MigratorRunner(
      context.cwd,
      migrationsPath,
      logger,
      options.lifecycleHook
    );

    await runner.run();
    return {
      success: true,
    };
  } catch (err) {
    logger.error(err.message);

    return {
      success: false,
      error: err.message,
    };
  }
}
