export const Steps = {
    ORIGIN: 'ORIGIN',
    DESTINATION: 'DESTINATION',
    VEHICLE: 'VEHICLE',
} as const;

export type Step = typeof Steps[keyof typeof Steps];

export interface StepConfig {
    component: React.ComponentType,
    maxHeight: boolean;
    title?: string;
    showBackButton?: boolean;
    snapPoints: string[];
    initialSnap?: number;
}

export type StepsRegistry = Record<Step, StepConfig>;