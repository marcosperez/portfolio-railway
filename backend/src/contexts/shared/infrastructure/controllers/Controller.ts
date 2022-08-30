import { ValidationError } from "joi";
import { Request, Response } from "express";

export interface Controller {
  handler(req: Request, res: Response): Promise<void>;
}

export interface ResultController<T> {
  status: boolean;
  reason?: string;
  data?: T;
  error?: ValidationError;
}

export interface ErrorController {
  status: boolean;
  reason?: string;
  error?: ValidationError;
}
