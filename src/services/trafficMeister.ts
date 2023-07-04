import { ISelection } from "../interfaces/ISelection";
import { ITrafficMeister } from "../interfaces/ITrafficMeister";
import trafficMeister from "./trafficMeisterData";

export const getTrafficMeisterData = (): Promise<string | ITrafficMeister[]> => {
    return new Promise<string | ITrafficMeister[]>((resolve, reject) => {
        trafficMeister.fetchData((err: string, data: ITrafficMeister[]) => {
            if (err) reject(err);
            resolve(data)
        })
    });
};

const getTypes = (data: ITrafficMeister[]) => {
    const types = data.map(item => item.type);
    return [...new Set(types)];
};

const getBrands = (data: ITrafficMeister[]) => {
    const brands = data.map(item => item.brand);
    return [...new Set(brands)];
};

const getColors = (data: ITrafficMeister[]) => {
    const colors = data.map(item => item.colors).flat();
    return [...new Set(colors)];
};

export const getSelectOptions = (data: ITrafficMeister[]) => {
    const types = getTypes(data);
    const brands = getBrands(data);
    const colors = getColors(data);
    return {types, brands, colors};
}

export const filterVehicles = (data: ITrafficMeister[], selection: ISelection): ITrafficMeister[] => {
    const fields = Object.keys(selection);

    if (fields.length) {
        const recursiveFilter = (dataToFilter: ITrafficMeister[], i = 0) => {
            const field = fields[i];
            const filteredData = (field === 'colors') 
            ? dataToFilter.filter(item => item[field].some(item => item === selection[field]))
            :  dataToFilter.filter(item => item[field] === selection[field]);

            return ( i < fields.length - 1 ) ? recursiveFilter(filteredData, i + 1) : filteredData;
        }

        return recursiveFilter(data);
    }

    return data;
};