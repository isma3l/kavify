import { StyleSheet } from "react-native";
import { Image, ImageSource } from 'expo-image';
import { Text, useAppTheme, View } from "@/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
    id: string;
    name: string;
    price: number;
    detail: string;
    image: ImageSource;
    capacity: number;
}

export function TripOptionItem({ id, capacity, name, price, detail, image }: Props) {
    const { colors } = useAppTheme();
    
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.vehicleImage} contentFit="contain" />
            <View style={styles.vehicleInfo}>
                <View style={styles.vehicleTitle}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.price}>{price}</Text>
                </View>
                <View style={styles.vehicleCapacity}>
                    <MaterialCommunityIcons name="account-outline" size={18} color={colors.inputTextPlaceholder} />
                    <Text style={{color: colors.inputTextPlaceholder }}>{capacity}</Text>
                </View>
                <Text style={{ color: colors.inputTextPlaceholder }}>{detail}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        paddingTop: 12,
        paddingBottom: 12,
        alignItems: 'center',
        gap: 2
    },
    vehicleImage: {
        width: 90,
        aspectRatio: 2
    },
    vehicleInfo: {
        flex: 1,
        gap: 2
    },
    vehicleTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    vehicleCapacity: {
        flexDirection: 'row'
    },
    name: {
        fontSize: 18,
        fontWeight: 600
    },
    detail: {
        color: 'gray'
    },
    price: {
        fontSize: 18,
        fontWeight: 600
    }
});