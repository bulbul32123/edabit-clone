import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProblems, reset } from '../features/problems/problemsSlice'
import Spinner from '../components/Spinner'
import { FaFilter } from 'react-icons/fa'

function ProblemsPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        category: '',
        difficulty: '',
    })

    const { problems, isLoading, isError, message } = useSelector(
        (state) => state.problems
    )

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        dispatch(getProblems(filters))

        return () => {
            dispatch(reset())
        }
    }, [dispatch, isError, message, filters])

    const handleFilterChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const resetFilters = () => {
        setFilters({
            category: '',
            difficulty: '',
        })
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>Coding Challenges</h1>
                <p>Practice and improve your coding skills</p>
            </section>

            <section className='filter-section'>
                <div className='filter-title'>
                    <FaFilter /> Filters
                </div>
                <div className='filter-controls'>
                    <div className='filter-group'>
                        <label htmlFor='category'>Category</label>
                        <select
                            name='category'
                            id='category'
                            value={filters.category}
                            onChange={handleFilterChange}
                        >
                            <option value=''>All Categories</option>
                            <option value='JavaScript'>JavaScript</option>
                            <option value='React'>React</option>
                            <option value='Node.js'>Node.js</option>
                            <option value='Next.js'>Next.js</option>
                            <option value='MongoDB'>MongoDB</option>
                        </select>
                    </div>
                    <div className='filter-group'>
                        <label htmlFor='difficulty'>Difficulty</label>
                        <select
                            name='difficulty'
                            id='difficulty'
                            value={filters.difficulty}
                            onChange={handleFilterChange}
                        >
                            <option value=''>All Difficulties</option>
                            <option value='Easy'>Easy</option>
                            <option value='Medium'>Medium</option>
                            <option value='Hard'>Hard</option>
                            <option value='Expert'>Expert</option>
                        </select>
                    </div>
                    <button className='btn btn-sm' onClick={resetFilters}>
                        Reset Filters
                    </button>
                </div>
            </section>

            <section className='content'>
                {problems.length > 0 ? (
                    <div className='problems-list'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Difficulty</th>
                                    <th>Points</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {problems.map((problem) => (
                                    <tr key={problem._id}>
                                        <td>{problem.title}</td>
                                        <td>{problem.category}</td>
                                        <td>
                                            <span className={`difficulty difficulty-${problem.difficulty.toLowerCase()}`}>
                                                {problem.difficulty}
                                            </span>
                                        </td>
                                        <td>{problem.points}</td>
                                        <td>
                                            <button
                                                className='btn btn-sm'
                                                onClick={() => navigate(`/problem/${problem._id}`)}
                                            >
                                                Solve
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='empty-state'>
                        <p>No problems found matching your criteria.</p>
                        <button className='btn' onClick={resetFilters}>
                            Clear Filters
                        </button>
                    </div>
                )}
            </section>
        </>
    )
}

export default ProblemsPage 