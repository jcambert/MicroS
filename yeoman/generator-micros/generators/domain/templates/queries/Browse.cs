using MicroS_Common.Types;
using <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Dto;

namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Queries
{
    public class Browse<%= changeCase.pascalCase(name)%>s : PagedQueryBase, IQuery<PagedResult<<%= changeCase.pascalCase(name)%>Dto>>
    {
    }
}
