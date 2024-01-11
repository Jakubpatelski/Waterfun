<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

<script>
    import { Router, Link, useNavigate } from 'svelte-navigator'
    import { user } from '../stores/userStore';
    import { Base_URL } from '../stores/global';

    const navigate = useNavigate()

    async function logout()  {

        const response = await fetch($Base_URL + '/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if(response.ok){
            navigate('/');
            user.set(null);

        }
    }


  </script>
  
    <Router>
        <nav>
            <div class="nav_text" id="notes">
                <Link to="/admin/bookings"><i class="fa-solid fa-calendar"></i> Bookings</Link>
                <Link to="/admin/users"><i class="fa-solid fa-user"></i> Users</Link>
                <Link to="/admin/tracks"><i class="fa-solid fa-water"></i> Tracks</Link>
                <Link to="/admin/customers"><i class="fas fa-users"></i> Customers</Link>            
            </div>
            <button on:click={logout} class="btn logout">Logout</button>
        </nav>

    </Router>

<style>
    * {
        box-sizing: border-box;
    }


    nav {

        display: flex;
        align-items: center;
        background-color: #1A81F4;
        height: 90px;
        padding: 20px;
        margin: 0; /* Add this line to remove the margin */

    }

  
    .nav_text {
        display: flex;
        gap: 20px;
        margin-right: auto;
        font-weight: 700;
        font-size: 22px;
    }

    .btn {
        color: #fff;
        border: 2px solid #fff;
        background-color: transparent;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 18px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    }

    .logout:hover {
  background-color: #fff;
  color: #2196F3;
}
    /* Define the style for the no-underline class */
    :global(a) {
        text-decoration: none;
        color: white;
    }
</style> 