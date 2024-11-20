import React from 'react'
import { Link } from 'react-router-dom';

function Page({ page }) {
    return (
        <div class="container-fluid page-header py-5">
            <h1 class="text-center text-white display-6">{ page }</h1>
            <ol class="breadcrumb justify-content-center mb-0">
                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                <li class="breadcrumb-item active text-white">{ page }</li>
            </ol>
        </div>
    )
}
export default Page;
