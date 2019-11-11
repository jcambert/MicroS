using MicroS_Common.Types;
using <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Dto;

namespace <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Queries
{
    public class Browse<%= changeCase.titleCase(name)%>s : PagedQueryBase, IQuery<PagedResult<<%= changeCase.titleCase(name)%>Dto>>
    {
    }
}
