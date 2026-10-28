import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { DestinationSelector, OriginSelector } from '@/features/home/components';
import { StepsRegistry, Steps, StepConfig } from "../types";
import { useTripStore } from "../store/useTripStore";
import { BottomSheetHeader } from './BottomSheetHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, WINDOW_HEIGHT } from '@/core';
import { useBackHandler } from '@/core/hooks/useBackHandler';
import { VehicleSelector } from './steps/VehicleSelector';

const configState: StepsRegistry = {
    [Steps.ORIGIN]: {
        component: OriginSelector,
        maxHeight: false,
        snapPoints: ['50%'],
    },
    [Steps.DESTINATION]: {
        component: DestinationSelector,
        maxHeight: true,
        title: "bottom_sheet.destination_selector.title",
        showBackButton: true,
        snapPoints: ['100%'],
    },
    [Steps.VEHICLE]: {
        component: VehicleSelector,
        maxHeight: false,
        snapPoints: ['50%', '100%'],
    }
}

export function TripManager() {
    const currentStep = useTripStore.use.currentStep();
    const goBack = useTripStore.use.goBack();
    const insets = useSafeAreaInsets();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [currentConfig, setConfig] = useState<StepConfig>(configState[currentStep]);
    const firstRender = useRef(true);

    useBackHandler(goBack);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        bottomSheetRef.current?.close();
    }, [currentStep]);
    console.log({currentStep})

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            bottomSheetRef.current?.snapToIndex(currentConfig.initialSnap ?? 0);
        });
        return () => cancelAnimationFrame(frame);
    }, [currentConfig]);

    const loadNextStep = useCallback(() => {
        setConfig(configState[currentStep]);
        }, [currentStep]);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            enablePanDownToClose={false}
            handleIndicatorStyle={ currentConfig.maxHeight ? styles.indicator : undefined}
            backgroundStyle={{
                backgroundColor: 'white',
                paddingBottom: WINDOW_HEIGHT
            }}
            snapPoints={currentConfig.snapPoints}
            onClose={loadNextStep}
        >
            <BottomSheetView 
                 style={[
                        styles.container, 
                        { 
                            paddingBottom: insets.bottom, 
                            height: currentConfig.maxHeight ? WINDOW_HEIGHT : undefined,
                            minHeight: currentConfig.maxHeight ? WINDOW_HEIGHT : undefined,
                        }
                    ]}
            >
                <View style={{ display: currentConfig.maxHeight ? 'flex' : 'none'}}>
                    <BottomSheetHeader 
                        title={currentConfig.title}
                        showBackButton={currentConfig.showBackButton}
                        onPressBack={goBack}
                    />
                </View>                
                <currentConfig.component />
            </BottomSheetView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    indicator: {
        backgroundColor: 'transparent'
    }
})