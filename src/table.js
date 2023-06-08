import React, { useState, useEffect } from 'react';
import './arrow.css';

function Table({ vetor, selectL }) {
    const [sortType, setSortType] = useState('nome');
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [sortedVetor, setSortedVetor] = useState([]);
    const [paginatedVetor, setPaginatedVetor] = useState([]);

    useEffect(() => {
        sortVetor();
    }, [vetor, sortType, sortDirection]);

    useEffect(() => {
        paginateVetor();
    }, [sortedVetor, currentPage, itemsPerPage]);

    const sortVetor = () => {
        const sorted = [...vetor].sort((a, b) => {
            let compareValue;

            if (sortType === 'preco') {
                compareValue = parseFloat(a[sortType]) - parseFloat(b[sortType]);
            } else {
                compareValue = a[sortType].localeCompare(b[sortType]);
            }

            return sortDirection === 'asc' ? compareValue : -compareValue;
        });

        setSortedVetor(sorted);
    };

    const handleSort = (type) => {
        if (type === sortType) {

            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {

            setSortType(type);
            setSortDirection('asc');
        }
    };

    const getSortArrow = (type) => {
        if (type === sortType) {
            if (sortDirection === 'asc') {
                return (
                    <span className="sort-arrow" onClick={() => handleSort(type)}>
                        &#9650;
                    </span>
                );
            } else {
                return (
                    <span className="sort-arrow" onClick={() => handleSort(type)}>
                        &#9660;
                    </span>
                );
            }
        }
        return null;
    };

    const paginateVetor = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginated = sortedVetor.slice(startIndex, endIndex);

        setPaginatedVetor(paginated);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        const totalPages = Math.ceil(sortedVetor.length / itemsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th onClick={() => handleSort('nome')}>
                            Nome {getSortArrow('nome')}
                        </th>
                        <th onClick={() => handleSort('autor')}>
                            Autor {getSortArrow('autor')}
                        </th>
                        <th onClick={() => handleSort('preco')}>
                            Preço (R$) {getSortArrow('preco')}
                        </th>
                        <th>Selecionar</th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedVetor.map((objeto, indice) => (
                        <tr key={indice}>
                            <td>{indice + 1}</td>
                            <td>{objeto.nome}</td>
                            <td>{objeto.autor}</td>
                            <td>{objeto.preco}</td>
                            <td>
                                <button onClick={() => selectL(indice)} className='btn btn-success'>
                                    Selecionar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    &lt; Anterior
                </button>
                <span>Página {currentPage}</span>
                <button onClick={goToNextPage} disabled={currentPage === Math.ceil(sortedVetor.length / itemsPerPage)}>
                    Próxima &gt;
                </button>
            </div>
        </div>
    );
}

export default Table;
