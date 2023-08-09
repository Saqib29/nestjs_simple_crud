import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    // get all
    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    // get one user
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        const user = await this.userService.findOne(id);
        if(!user) {
            throw new Error('User not found');
        } else {
            return user;
        }
    }

    // create user
    @Post()
    async create(@Body() user: User): Promise<User> {
        return await this.userService.create(user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() user: User): Promise<User> {
        return this.userService.update(id, user);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        // handle the error if the user is not found
        const user = await this.userService.findOne(id);
        if(!user) {
            throw new Error('User not found')
        }

        return this.userService.delete(id);

    }

}
