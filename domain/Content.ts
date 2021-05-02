export type Content = {
    id: string;
    name: string;
    data: string;
}

export const Contents = {
    make(id: string, name: string, data: string): Content {
        // TODO: Validate ID and Name

        return {
            id,
            name,
            data
        }
    }
}