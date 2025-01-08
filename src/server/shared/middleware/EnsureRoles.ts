import { RequestHandler } from 'express';

export const checkUserRole = (requiredRoles: string[]): RequestHandler => {
    return (req, res, next) => {
        const userRoles = req.headers.roles;

        const hasRequiredRole = requiredRoles.some(role =>
            userRoles?.includes(role)
        );
        if (!hasRequiredRole) {
            return res.status(403).json({
                code: 1009,
                message: 'Usuário não tem permissão para acessar esta rota'
            });
        }

        next();
    };
};
