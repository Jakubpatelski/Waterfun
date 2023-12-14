
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

<script>
    import Navbar from "../../components/Navbar.svelte";
</script>

<Navbar />

<div class="main-content">
    <section class="welcome-section">
        <h1><i class="fas fa-home"></i> Welcome to Employee's page</h1>
        <p>This is the central hub for managing users and bookings.</p>
    </section>

    <section class="user-management-section">
        <h2><i class="fas fa-users"></i> Użytkownicy</h2>
        <p>Effortlessly handle user accounts, permissions, and details.</p>
        <a href="/admin/users" class="action-button">Manage Users</a>
    </section>

    <section class="booking-section">
        <h2><i class="far fa-calendar-alt"></i> Rezerwacje</h2>
        <p>Streamline the process of managing and tracking bookings.</p>
        <a href="/admin/bookings" class="action-button">View Bookings</a>
    </section>
</div>

<style>
    .main-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2px;
        
    }

    .welcome-section,
    .user-management-section,
    .booking-section {
        margin-bottom: 40px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 20px;
        margin-bottom: 20px;
        padding: 20px;
    }

    h1, h2 {
        color: black;
        
    }

    p {
        color: black;
        font-size: 18px;
        line-height: 1.6;
    }

    .action-button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #3498db;
        color: #ffffff;
        text-decoration: none;
        border-radius: 4px;
        margin-top: 10px;
        transition: background-color 0.3s ease;
        
    }

    .action-button:hover {
        background-color: #2980b9;
    }
</style>
