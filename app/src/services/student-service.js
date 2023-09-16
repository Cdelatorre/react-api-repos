import http from "./base-service";

export const getHelloWorld = () => http.get("/");

export const createStudent = (body) => http.post("/create", body);

export const getStudent = (id) => http.get(`/student/${id}`);

export const updateStudent = (id, body) => http.patch(`/student/${id}`, body);
