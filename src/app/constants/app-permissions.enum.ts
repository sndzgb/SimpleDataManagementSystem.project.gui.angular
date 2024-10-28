export enum AppPermissions {
    IsInRole = 1000,
    HasRoleAdmin = 1001,
    HasRoleEmployee = 1002,
    HasRoleUser = 1003,
    IsVerified = 2000,
    IsResourceOwner = 3001,
    IsAuthenticated = 4001,
    IsAnonymous = 4002,
    // ConditionalIsResourceOwner = 2001,
    // UnconditionalIsResourceOwner = 10000
    UnconditionalIsInRoleAdmin = 10000,
    Custom = 99999
}
