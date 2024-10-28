import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { UserModule } from '@/api/user/user.module';
import { UsersModule } from '@/api/users/users.module';
import { UserMiddleware } from '@/middlewares/user.middleware';
import { NeuronFrontendMiddleware } from '@/middlewares/neuron-frontend.middleware';
import { NeuronsModule } from './neurons/neurons.module';
import { AuthModule } from '@/api/auth/auth.module';


@Module({
  imports: [
    UserModule,
    UsersModule,
    AuthModule,
    NeuronsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NeuronFrontendMiddleware).forRoutes('/');
    consumer
      .apply(UserMiddleware)
      .exclude('auth')
      .forRoutes('user');
    consumer
      .apply(AuthMiddleware)
      .forRoutes('auth');
  }
}
