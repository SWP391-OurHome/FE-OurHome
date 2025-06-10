import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropertyCard from '../PropertyCard/PropertyCard';
import './PropertyList.css';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [selectedPurpose, setSelectedPurpose] = useState('buy'); // Default to 'buy'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:8082/api/listing')
            .then((response) => {
                console.log('API Response:', response.data);
                setProperties(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('API Error:', error);
                setError('Error loading property list: ' + error.message);
                setLoading(false);
            });
    }, []);

    const filteredProperties = properties.filter((p) => {
        const cityMatch = p.city?.toLowerCase().includes('da nang');
        const purposeMatch = p.purpose?.trim().toLowerCase() === selectedPurpose;
        return cityMatch && purposeMatch;
    });

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="property-wrapper">
            <h2>Properties in Da Nang</h2>
            <div className="filter-buttons">
                <button
                    className={selectedPurpose === 'buy' ? 'active' : ''}
                    onClick={() => setSelectedPurpose('buy')}
                >
                    <i className="bi bi-house"></i> For Sale
                </button>
                <button
                    className={selectedPurpose === 'rent' ? 'active' : ''}
                    onClick={() => setSelectedPurpose('rent')}
                >
                    <i className="bi bi-file-earmark-fill"></i> For Rent
                </button>
            </div>

            <div className="property-grid">
                {filteredProperties.length === 0 ? (
                    <p>No properties found.</p>
                ) : (
                    filteredProperties.map((property) => {
                        const id = property.propertyID || property.propertyId;
                        return (
                            <Link
                                to={`/property/${id}`}
                                key={id}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <PropertyCard property={property} />
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default PropertyList;
