Performance Testing

Performance testing was conducted on the UCAB web application to
evaluate its speed, responsiveness, stability, and scalability under
different user loads. The testing focused on the application’s core
functionalities, including user authentication, cab search, ride
booking, booking history retrieval, driver ride management, and admin
dashboard operations.

The application was tested by sending multiple concurrent requests to
the backend APIs and monitoring response times, throughput, and system
resource utilization. MongoDB database operations were also evaluated to
ensure efficient data retrieval and storage during continuous booking
activities.

The results showed that UCAB maintained consistent performance with low
response times and minimal errors under normal workloads. The React
frontend rendered pages smoothly, while the Node.js and Express.js
backend efficiently processed API requests. JWT-based authentication and
optimized database queries contributed to secure and reliable request
handling.

Overall, the performance testing confirmed that the UCAB application is
capable of supporting multiple simultaneous users while maintaining fast
response times, stable operation, and a seamless cab booking experience
for users, drivers, and administrators.
