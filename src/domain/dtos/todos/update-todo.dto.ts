export class UpdateTodoDto {
    private constructor(
        public readonly id: string,
        public readonly text: string,
        public readonly completedAt?: Date 
    ) {}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if(this.text) returnObj.text = this.text;
        if(this.completedAt) returnObj.completedAt = this.completedAt;

        return returnObj;
    }

    static create(props: {[key: string]: any}): [string?, UpdateTodoDto?] {
        const { id,text, completedAt } = props;
        let newCompletedAt = completedAt;
        if(!id) return ["Id must be provided", undefined];

        if(completedAt) {
            newCompletedAt = new Date(completedAt);
            if(newCompletedAt.toString() === "Invalid Date") {
                return ["completedAt property must be a valid date", undefined];
            }

        }

        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
    }
}