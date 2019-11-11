using MicroS_Common.Authentication;

namespace <%=namespace%>.api.Framework
{
    public class AdminAuthAttribute : JwtAuthAttribute
    {
        public AdminAuthAttribute() : base("admin")
        {
        }
    }
}