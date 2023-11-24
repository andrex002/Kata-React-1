export interface ITask {
  id: string;
  taskText: string;
  completed: boolean;
  editing: boolean;
  date: Date;
  min: number;
  sec: number;
  intervalId?: NodeJS.Timeout;
  timerStatus?: string;
  timerOn?: boolean;
}
