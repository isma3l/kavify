import { Button, View } from "@/core";
import { useTranslation } from "react-i18next";
import { TripOptionItem } from "../TripOptionItem";
import { VEHICLES_IMAGES } from "@/assets/images/vehicles";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

const data = [
    { 
        id: "1",
        name: "Economic",
        price: 18.40,
        detail: "Vehiculos estandar",
        capacity: 4,
        image: VEHICLES_IMAGES.economy
    },
    { 
        id: "2",
        name: "Comfort",
        price: 25.50,
        detail: "Vehiculos amplios",
        capacity: 4,
        image: VEHICLES_IMAGES.comfort
    },
    { 
        id: "3",
        name: "Comfort",
        price: 29,
        detail: "Vehiculos estandar y premium",
        capacity: 4,
        image: VEHICLES_IMAGES.premium
    },
    { 
        id: "4",
        name: "Electric",
        price: 27,
        detail: "Vehiculos ambientales",
        capacity: 4,
        image: VEHICLES_IMAGES.electric
    },
    { 
        id: "5",
        name: "Comfort",
        price: 36,
        detail: "Vehiculos amplios",
        capacity: 6,
        image: VEHICLES_IMAGES.xl
    },
]

export function VehicleSelector() {
    const { t } = useTranslation("home");
    
    return (
        <View>
            <FlatList 
                data={data}
                renderItem={({ item }) => (
                    <TripOptionItem 
                        id={item.id} 
                        name={item.name} 
                        price={item.price} 
                        detail={item.detail} 
                        capacity={item.capacity}
                        image={item.image}
                    />
                )}
            />
            <View style={styles.bookingOptions}>
                <Button>{t("bottom_sheet.vehicle_selector.button_selector")}</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bookingOptions: {
        padding: 16,
        paddingBottom: 8,
        paddingTop: 16,
        borderTopWidth: 1,
    }
})