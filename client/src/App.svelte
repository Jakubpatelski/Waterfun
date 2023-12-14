<script>
  import { Route, Router } from 'svelte-navigator'
  import Login from "./pages/login/Login.svelte";
  import Home from "./pages/home/Home.svelte";
  import Contact from "./pages/contact/Contact.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import Main from './pages/admin/Main.svelte';
  import AboutUs from './pages/aboutUs/AboutUs.svelte';
  import Pricing from './pages/pricing/Pricing.svelte';
  import Gallery from './pages/gallery/Gallery.svelte';
  import Users from './pages/users/Users.svelte';
  import TracksAdmin from './pages/tracksAdmin/TracksAdmin.svelte';
  import Customers from './pages/customers/Customers.svelte';
  import Bookings from './pages/Bookings/Bookings.svelte';
  import Tracks from './pages/tracks/Tracks.svelte'
  


</script>

  <Router>
    <Route path="/" >
      <Home />
     </Route>
      <Route path="/login" >
        <Login />
       </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/galeria">
        <Gallery />
      </Route>
      <Route path="/cennik">
        <Pricing />
      </Route> 
      <Route path="/about">
        <AboutUs />
      </Route> 
      <Route path="/wynajem">
        <Tracks />
      </Route> 
    
      <PrivateRoute path="/admin">
        <Main />
      </PrivateRoute>
      <PrivateRoute path="/admin/users">
        <Users />
      </PrivateRoute>
      <PrivateRoute path="/admin/tracks">
        <TracksAdmin />
      </PrivateRoute>
      <PrivateRoute path="/admin/customers">
        <Customers />
      </PrivateRoute>
      <PrivateRoute path="/admin/bookings">
        <Bookings />
      </PrivateRoute>
     
      
   
     
      <Route path="/*">
        <Home />
      </Route>
  </Router>
