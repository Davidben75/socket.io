export default class Message {
    id: string;
    content: string;
    created: Date | null;

    constructor(
        id : string,
        content : string,
        created : Date = new Date()
    ) {
        this.id = id;
        this.content = content;
        this.created = created;
    }
    
}