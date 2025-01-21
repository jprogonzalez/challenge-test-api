export class RoleValidation {
    static isValidRoleForResource(userRole: string, resource: string): boolean {

        const allowedRolesForResource: {
            films: string[];
            people: string[];
            locations: string[];
            species: string[];
            vehicles: string[];
        } = {
            films: ['films'],
            people: ['people'],
            locations: ['locations'],
            species: ['species'],
            vehicles: ['vehicles'],
        };

        if (userRole === 'admin') {
            return true; 
        }

        if (resource in allowedRolesForResource) {
            return allowedRolesForResource[resource as keyof typeof allowedRolesForResource]?.includes(userRole) ?? false;
        }

        return false;
    }
}