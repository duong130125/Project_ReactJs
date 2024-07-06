export interface Users {
    id: number
    name: string
    password: string
    email: string
    role: number
    profilePicture: string
    status: boolean
}

export interface Courses {
    id: number,
    title: string,
    description: string
}

export interface ExamSubjects {
    id: number,
    title: string,
    description: string,
    courseId: number
}

export interface Exams {
    id: number,
    title: string,
    description: string,
    duration: number,
    examSubjectId: number
}

export interface Questions {
    id: number,
    question: string,
    examId: number,
    options: [],
    answer: number
}

export interface userAnswers {
    id: number,
    userId: number,
    exampId: number,
    score: number
}