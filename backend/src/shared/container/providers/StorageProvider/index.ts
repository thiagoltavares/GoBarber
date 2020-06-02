import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import AmazonStorageProvider from '@shared/container/providers/StorageProvider/implementations/AmazonStorageProvider';

const providers = {
  disk: DiskStorageProvider,
  amazon: AmazonStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'MailTemplateProvider',
  providers.disk,
);
