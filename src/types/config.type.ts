export interface IDataBase{
    connect():Promise<void>,
    disconnect():Promise<void>,
}