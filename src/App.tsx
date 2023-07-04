import React, { useEffect, useState } from 'react';
import { ISelection } from './interfaces/ISelection';
import { ITrafficMeister } from './interfaces/ITrafficMeister';
import { filterVehicles, getSelectOptions, getTrafficMeisterData, } from './services/trafficMeister';
import Loading from './components/loading';
import Select from './components/select';
import UserSelection from './components/userSelection';
import './App.scss';
import Dialog from './components/dialog';

function App() {
    const [trafficMeisterData, setTrafficMeisterData] = useState<ITrafficMeister[]>([]);
    const [selection, setSelection] = useState<ISelection>({});
    const [types, setTypes] = useState<string[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [bgImage, setBgImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        let cancel = false;
        setIsError(false);
        setIsLoading(true);

        getTrafficMeisterData()
            .then(res => {
                if (cancel) return;
                setTrafficMeisterData(res as ITrafficMeister[]);
                setIsLoading(false);
            }).catch(err => {
                setIsError(true);
                setIsLoading(false);
            });
        return () => { cancel = true };
    }, []);

    useEffect(() => { updateSelection({}) }, [trafficMeisterData]);

    useEffect(() => {
        const updatedData = filterVehicles(trafficMeisterData, selection);
        const { types, brands, colors } = getSelectOptions(updatedData);
        setTypes(types);
        setBrands(brands);
        setColors(colors);
        setImage(updatedData);
    }, [selection]);

    const updateSelection = (updatedItem: ISelection) => {
        setSelection(prevState => ({ ...prevState, ...updatedItem }))
    }

    const setImage = (updatedData: ITrafficMeister[]) => {
        const selectionKeys = Object.keys(selection);
        const hasBrand = selectionKeys.some(key => key === 'brand');

        if (hasBrand) {
            const imageURL = `url(${updatedData[0].img})`;
            setBgImage(imageURL);
        }
    };

    const loadData = () => {
        setIsError(false);
        setIsLoading(true);

        getTrafficMeisterData()
            .then(res => {
                setTrafficMeisterData(res as ITrafficMeister[]);
            }).catch(err => {
                setIsError(true);
                console.error(err);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="container">
            {isLoading && <Loading />}
            {
                isError &&
                <Dialog
                    label="Could Not Load Data"
                    description="An error occurred during the loading of this options. Make a new data request."
                    callbackFn={loadData}
                />
            }
            <div className="col-picture" style={{ backgroundImage: bgImage }}></div>
            <div className="col-form">
                <div className="form-content">
                    <h2 className='up-title'>Sytac-DevCase</h2>
                    <h1 className='title'>Traffic Meister</h1>
                    <p className='author'>Adriel Zarate</p>

                    <Select
                        label='type'
                        options={types}
                        selection={selection}
                        update={updateSelection}
                        disabled={isLoading}
                    />
                    <Select
                        label='brand'
                        options={brands}
                        selection={selection}
                        update={updateSelection}
                        disabled={isLoading}
                    />
                    <Select
                        label='colors'
                        options={colors}
                        selection={selection}
                        update={updateSelection}
                        disabled={isLoading}
                    />
                    {
                        !!Object.keys(selection).length &&
                        <UserSelection selection={selection} />
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
