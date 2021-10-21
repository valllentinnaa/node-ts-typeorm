import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { generateHash } from '../../utils/auth.util'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name?: string

  @Column({
    unique: true,
  })
  email!: string

  @Column({ select: false })
  password!: string

  @Column({
    type: 'text',
    nullable: true,
  })
  resetToken?: string

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  resetTokenExpires?: Date

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  passwordReset?: Date

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
  })
  deletedAt: Date

  // HOOKS
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      this.password = await generateHash(this.password)
    } catch (error) {
      console.log(error)
    }
  }
}
