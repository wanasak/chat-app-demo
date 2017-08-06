export interface IThread {
    id: number;
    messageIds: number[];
    participants: { [key: number]: number };
}
