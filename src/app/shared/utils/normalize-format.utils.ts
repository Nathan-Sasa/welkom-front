export function isEmailInvalid(email: string): boolean {
    const value = email.trim();

    if (!value) {
        return false;
    }

    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function normalizeTelephone(telephone: string): string {
    return telephone.replace(/[\s().-]/g, '');
}