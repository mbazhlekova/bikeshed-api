import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Poll from './poll.entity';

@Entity()
export default class Choice {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public text: string;

  @ManyToOne(type => Poll, poll => poll.choices)
  public poll: Poll;
}
