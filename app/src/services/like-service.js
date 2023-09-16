import http from "./base-service";

export const createLike = (studentId) => http.post(`/like/${studentId}`);

export const deleteLike = (studentId) => http.delete(`/like/${studentId}`);
