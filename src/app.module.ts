import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { ContactModule } from './contact/contact.module';
import { ContactGroupModule } from './contact-group/contact-group.module';
import { ContactListModule } from './contact-list/contact-list.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    WorkspaceModule,
    ContactModule,
    ContactGroupModule,
    ContactListModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
