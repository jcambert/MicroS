using MicroS_Common.Types;
using RestEase;
using System;
using System.Threading.Tasks;
using <%=namespace%>.domain.<%= changeCase.titleCase(name) %>s.Dto;
using <%=namespace%>.domain.<%= changeCase.titleCase(name) %>s.Queries;

/// <summary>
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=namespace%>.api.Services
{
    /// <summary>
    /// <%= changeCase.titleCase(name) %> Service created by <see cref="https://www.nuget.org/packages/RestEase/">Restease</see>
    /// </summary>
    [SerializationMethods(Query = QuerySerializationMethod.Serialized)]
    public partial interface I<%= changeCase.titleCase(name) %>sService
    {
        /// <summary>
        /// Get <%= changeCase.lowerCase(name) %> by its Id
        /// </summary>
        /// <param name="id">the id of  <%= changeCase.titleCase(name) %></param>
        /// <returns><%= changeCase.titleCase(name) %>Dto</returns>
        [AllowAnyStatusCode]
        [Get("<%= changeCase.lowerCase(name) %>s/{id}")]
        Task<<%= changeCase.titleCase(name) %>Dto> GetAsync([Path] Guid id);


         /// <summary>
        /// Get list of <%= changeCase.lowerCase(name) %>s by Browse<%= changeCase.titleCase(name) %>s Query
        /// </summary>
        /// <param name="query">The Browse <%= changeCase.lowerCase(name) %>s query</param>
        /// <returns>a list of <%= changeCase.titleCase(name) %>Dto</returns>
        [AllowAnyStatusCode]
        [Get("<%= changeCase.lowerCase(name) %>s")]
        Task<PagedResult<<%= changeCase.titleCase(name) %>Dto>> BrowseAsync([Query] Browse<%= changeCase.titleCase(name) %>s query);
    }
}
