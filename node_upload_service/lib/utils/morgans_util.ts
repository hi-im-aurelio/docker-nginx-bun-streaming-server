import type { Request, Response, NextFunction } from "express";

const Morgans = {
    big_news(req: Request, res: Response, next: NextFunction): void {
        const start = Date.now();
        const startTime = new Date(start).toISOString();

        console.log(`[${startTime}] Request start: ${req.method} ${req.url}`);

        res.on("finish", () => {
            const duration = Date.now() - start;
            const endTime = new Date().toISOString();
            console.log(`[${endTime}] Request end: ${req.method} ${req.url} - Status: ${res.statusCode} - Time: ${duration}ms`);
        });

        res.on("close", () => {
            const duration = Date.now() - start;
            const closeTime = new Date().toISOString();
            console.error(`[${closeTime}] Request closed prematurely: ${req.method} ${req.url} - Status: ${res.statusCode} - Time: ${duration}ms`);
        });

        res.on("error", (err) => {
            const duration = Date.now() - start;
            const errorTime = new Date().toISOString();
            console.error(
                `[${errorTime}] Request error: ${req.method} ${req.url} - Status: ${res.statusCode} - Time: ${duration}ms - Err: ${err.message}`,
            );
        });

        next();
    },
};

export default Morgans;
