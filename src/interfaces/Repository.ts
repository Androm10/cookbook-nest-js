export interface BasicRepository<Model> {
    create(...args: any[]) : Promise<Model>
    getById(id: number) : Promise<Model>;
    getAll() : Promise<Model[]>;
    updateById(id: number, props: any) : Promise<Model>;
    deleteById(id: number) : Promise<boolean>;
}