import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Poll from './Poll';

@Entity()
export default class Choice {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public text: string;

  @Column()
  public votes: number = 0;

  @ManyToOne(type => Poll, poll => poll.choices)
  public poll: Poll;
}
