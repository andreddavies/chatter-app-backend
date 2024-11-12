import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { Chat } from './entities/chat.entity';
import { ChatsService } from './chats.service';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ITokenPayload } from 'src/auth/token-payload.interface';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(private readonly chatsService: ChatsService) {}

  @Mutation(() => Chat)
  createChat(
    @Args('createChatInput') createChatInput: CreateChatInput,
    @CurrentUser() user: ITokenPayload,
  ) {
    return this.chatsService.create(createChatInput, user._id);
  }

  @Query(() => [Chat], { name: 'chats' })
  findAll() {
    return this.chatsService.findAll();
  }

  @Query(() => Chat, { name: 'chat' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.chatsService.findOne(id);
  }

  @Mutation(() => Chat)
  updateChat(@Args('updateChatInput') updateChatInput: UpdateChatInput) {
    return this.chatsService.update(updateChatInput.id, updateChatInput);
  }

  @Mutation(() => Chat)
  removeChat(@Args('id', { type: () => Int }) id: number) {
    return this.chatsService.remove(id);
  }
}
