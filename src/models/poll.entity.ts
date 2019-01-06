import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Choice from './choice.entity';

@Entity()
export default class Poll {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public name: string;

  @OneToMany(type => Choice, choice => choice.poll)
  public choices: Choice[];
}
