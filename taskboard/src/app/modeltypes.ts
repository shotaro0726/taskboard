export interface Task {
    id: number
    targetsprint: any
    task: string 
    description: string
    criteria: string
    responsible: any
    estimate: number
    targettag: any
    status: number
    created_at: any
    updated_at: any
}

export interface User {
    id: number
    username: string
}

export interface Sprint {
    id: number
    sprint: string
}

export interface Tag {
    id: number
    tag: string
}