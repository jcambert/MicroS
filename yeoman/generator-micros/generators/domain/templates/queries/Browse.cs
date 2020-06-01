using MicroS_Common.Types;
using <%=appname%>.domain.<%= domain%>s.Dto;

/// <summary>
/// This file was generated by the yeoman generator "generator-micros"
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=appname%>.domain.<%= domain%>s.Queries
{
    public class Browse<%= pascalDomain%>s : PagedQueryBase, IQuery<PagedResult<<%= pascalDomain%>Dto>>
    {
    }
}
